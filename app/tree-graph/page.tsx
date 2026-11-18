"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hasAccessCookie } from "@/lib/clientAccess";
import { familyMembers, type FamilyMember } from "@/lib/familyData";
import { relations, type Relation } from "@/lib/familyRelations";
import { hierarchy, tree, type HierarchyPointNode } from "d3-hierarchy";

type Lang = "uk" | "en";

type Node = FamilyMember & {
  id: string;
  parents: string[];
  children: string[];
  spouses: string[];
  branchColor?: string;
};

type TreeNodeData = {
  id: string;
  person: Node;
  children: TreeNodeData[];
};

type Positioned = {
  id: string;
  x: number;
  y: number;
  person: Node;
};

export default function TreeGraphPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("uk");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasInitialCentered, setHasInitialCentered] = useState(false);

  // touch
  const [isTouchPanning, setIsTouchPanning] = useState(false);
  const [touchPanStart, setTouchPanStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null
  );

  const t = (uk: string, en: string) => (lang === "uk" ? uk : en);

  useEffect(() => {
    if (!hasAccessCookie()) {
      router.replace("/gate");
    }
  }, [router]);

  // ---- 1. Дані + кольори гілок ----
  const { rootData, byIdFull } = useMemo(() => {
    const byId: Record<string, Node> = {};

    familyMembers.forEach((m) => {
      byId[m.id] = {
        ...m,
        id: m.id,
        parents: [],
        children: [],
        spouses: [],
        branchColor: undefined,
      };
    });

    relations.forEach((r: Relation) => {
      if (r.type === "parent") {
        const parent = byId[r.parent];
        const child = byId[r.child];
        if (parent && child) {
          if (!child.parents.includes(parent.id)) child.parents.push(parent.id);
          if (!parent.children.includes(child.id))
            parent.children.push(child.id);
        }
      } else if (r.type === "spouse") {
        const a = byId[r.a];
        const b = byId[r.b];
        if (a && b) {
          if (!a.spouses.includes(b.id)) a.spouses.push(b.id);
          if (!b.spouses.includes(a.id)) b.spouses.push(a.id);
        }
      }
    });

    const rootId = "p101";
    const rootPerson = byId[rootId];
    if (!rootPerson) {
      return { rootData: null, byIdFull: byId };
    }

    const branchColors = [
      "#0f172a",
      "#022c22",
      "#1e1b4b",
      "#14532d",
      "#1e293b",
      "#0b1120",
      "#0369a1",
    ];

    const rootChildrenIds = rootPerson.children || [];

    rootChildrenIds.forEach((childId, index) => {
      const child = byId[childId];
      if (!child) return;

      const color = branchColors[index % branchColors.length];
      const visited = new Set<string>();

      const assignBranchColorDeep = (id: string) => {
        if (visited.has(id)) return;
        visited.add(id);

        const person = byId[id];
        if (!person) return;

        if (!person.branchColor) {
          person.branchColor = color;
        }

        person.children.forEach(assignBranchColorDeep);

        person.spouses.forEach((sid) => {
          const spouse = byId[sid];
          if (spouse && !spouse.branchColor) {
            spouse.branchColor = color;
          }
        });
      };

      assignBranchColorDeep(childId);
    });

    const buildTree = (p: Node, visited = new Set<string>()): TreeNodeData => {
      if (visited.has(p.id)) {
        return { id: p.id, person: p, children: [] };
      }
      visited.add(p.id);

      const childNodes: TreeNodeData[] = p.children
        .map((cid) => byId[cid])
        .filter((c): c is Node => Boolean(c))
        .map((child) => buildTree(child, new Set(visited)));

      return {
        id: p.id,
        person: p,
        children: childNodes,
      };
    };

    const rootData = buildTree(rootPerson);

    return { rootData, byIdFull: byId };
  }, []);

  // ---- 2. Layout D3 ----
  const baseLayout = useMemo<{
    positionedNodes: Positioned[];
    links: {
      source: HierarchyPointNode<TreeNodeData>;
      target: HierarchyPointNode<TreeNodeData>;
    }[];
  }>(() => {
    if (!rootData) {
      return { positionedNodes: [], links: [] };
    }

    const root = hierarchy<TreeNodeData>(rootData, (d) => d.children);

    const nodeWidth = 380;
    const nodeHeight = 300;

    const layout = tree<TreeNodeData>().nodeSize([nodeWidth, nodeHeight]);

    const treeRoot = layout(root) as HierarchyPointNode<TreeNodeData>;
    const nodes = treeRoot.descendants();
    const links = treeRoot.links() as {
      source: HierarchyPointNode<TreeNodeData>;
      target: HierarchyPointNode<TreeNodeData>;
    }[];

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = 0;
    let maxY = 0;

    nodes.forEach((n) => {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });

    const padding = 80;

    const positionedNodes: Positioned[] = nodes.map((n) => ({
      id: n.data.id,
      x: n.x - minX + padding,
      y: n.y + padding,
      person: n.data.person,
    }));

    return { positionedNodes, links };
  }, [rootData]);

  const { positionedNodes } = baseLayout;

  // ---- 3. Подружжя + локальні корекції ----
  const { extendedNodes, marriageLines } = useMemo(() => {
    const byIdBase: Record<string, Positioned> = {};
    positionedNodes.forEach((n) => {
      byIdBase[n.id] = n;
    });

    let extended: Positioned[] = [...positionedNodes];
    const byIdExtended: Record<string, Positioned> = { ...byIdBase };

    type MarriageLine = { a: string; b: string };
    const marriageLines: MarriageLine[] = [];
    const seenPairs = new Set<string>();

    const spouseOffset = 260;

    // Додаємо подружжя поруч
    positionedNodes.forEach((n) => {
      const person = n.person;
      if (!person.spouses || person.spouses.length === 0) return;

      person.spouses.forEach((spouseId) => {
        const key1 = `${person.id}::${spouseId}`;
        const key2 = `${spouseId}::${person.id}`;
        if (seenPairs.has(key1) || seenPairs.has(key2)) return;
        seenPairs.add(key1);
        seenPairs.add(key2);

        const spousePerson = byIdFull[spouseId];
        if (!spousePerson) return;

        let spouseNode = byIdExtended[spouseId];

        if (!spouseNode) {
          const x = n.x + spouseOffset;
          const y = n.y;

          spouseNode = {
            id: spousePerson.id,
            x,
            y,
            person: spousePerson,
          };

          extended.push(spouseNode);
          byIdExtended[spousePerson.id] = spouseNode;
        }

        marriageLines.push({ a: person.id, b: spousePerson.id });
      });
    });

    // Гілка Феодосії (p106) + Ніканор (p120) — вліво
    const descendantsOf106 = new Set<string>();
    const collectDescendants = (id: string) => {
      const person = byIdFull[id];
      if (!person) return;
      person.children.forEach((cid) => {
        if (!descendantsOf106.has(cid)) {
          descendantsOf106.add(cid);
          collectDescendants(cid);
        }
      });
    };
    descendantsOf106.add("p106");
    collectDescendants("p106");
    descendantsOf106.add("p120");

    const shiftLeft106 = -120;
    extended = extended.map((node) =>
      descendantsOf106.has(node.id)
        ? { ...node, x: node.x + shiftLeft106 }
        : node
    );

    // Діти Петра (p111) та Афанасії (p112) — ширше
    const childrenOf111 = byIdFull["p111"]?.children ?? [];
    const childrenOf112 = byIdFull["p112"]?.children ?? [];
    const targetChildren = new Set<string>([
      ...childrenOf111,
      ...childrenOf112,
    ]);

    const shiftChildrenLeft = -200;
    extended = extended.map((node) =>
      targetChildren.has(node.id)
        ? { ...node, x: node.x + shiftChildrenLeft }
        : node
    );

    const childrenNodes = extended.filter((n) => targetChildren.has(n.id));
    if (childrenNodes.length > 1) {
      childrenNodes.sort((a, b) => a.x - b.x);

      const baseXCenter =
        (childrenNodes[0].x + childrenNodes[childrenNodes.length - 1].x) / 2;

      const spacing = spouseOffset * 2;
      const updatedPositions: Record<string, number> = {};
      const totalWidth = spacing * (childrenNodes.length - 1);
      let startX = baseXCenter - totalWidth / 2;

      childrenNodes.forEach((child, index) => {
        const newX = startX + index * spacing;
        updatedPositions[child.id] = newX;
      });

      extended = extended.map((node) => {
        const newX = updatedPositions[node.id];
        return typeof newX === "number" ? { ...node, x: newX } : node;
      });
    }

    // Відстань між 111–112
    const n111 = extended.find((n) => n.id === "p111");
    const n112 = extended.find((n) => n.id === "p112");
    const n115 = extended.find((n) => n.id === "p115");
    const n132 = extended.find((n) => n.id === "p132");
    let dist111_112: number | null = null;

    if (n111 && n112) {
      dist111_112 = Math.abs(n112.x - n111.x);
    }

    // Вирівнюємо 115–132 під відстань 111–112
    if (dist111_112 && n115 && n132) {
      const new132x =
        n115.x + (n115.x < n132.x ? dist111_112 : -dist111_112);

      extended = extended.map((node) =>
        node.id === "p132" ? { ...node, x: new132x } : node
      );
    }

    // Фінальна корекція: відступ зліва
    let minX = Infinity;
    extended.forEach((n) => {
      if (n.x < minX) minX = n.x;
    });
    const desiredLeft = 200;
    const delta = desiredLeft - minX;
    extended = extended.map((n) => ({ ...n, x: n.x + delta }));

    // Локально: посунути p133, p134
    extended = extended.map((n) => {
      if (n.id === "p133") {
        return { ...n, x: n.x - 360 };
      }
      if (n.id === "p134") {
        return { ...n, x: n.x - 140 };
      }
      return n;
    });

    // Вирівнюємо 133–135 під відстань 111–112
    const n133 = extended.find((n) => n.id === "p133");
    const n135 = extended.find((n) => n.id === "p135");

    if (dist111_112 && n133 && n135) {
      const new135x =
        n133.x + (n133.x < n135.x ? dist111_112 : -dist111_112);

      extended = extended.map((node) =>
        node.id === "p135" ? { ...node, x: new135x } : node
      );
    }

    return { extendedNodes: extended, marriageLines };
  }, [positionedNodes, byIdFull]);

  // ---- 4. Розмір полотна ----
  const { canvasWidth, canvasHeight } = useMemo(() => {
    if (extendedNodes.length === 0) {
      return { canvasWidth: 1400, canvasHeight: 700 };
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    extendedNodes.forEach((n) => {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });

    const nodeWidth = 240;
    const nodeHeight = 80;
    const padding = 200;

    const width = maxX - minX + nodeWidth + padding * 2;
    const height = maxY - minY + nodeHeight + padding * 2;

    return {
      canvasWidth: Math.max(width, 1400),
      canvasHeight: Math.max(height, 700),
    };
  }, [extendedNodes]);

  // ---- 5. id → Positioned ----
  const nodeById = useMemo(() => {
    const m: Record<string, Positioned> = {};
    extendedNodes.forEach((n) => {
      m[n.id] = n;
    });
    return m;
  }, [extendedNodes]);

  // ---- 6. Зум / панорамування (миша) ----
  const applyZoom = (value: number) =>
    Math.min(2, Math.max(0.3, Math.round(value * 10) / 10));

  const handleZoomOut = () => {
    const newZoom = applyZoom(zoom - 0.1);
    setZoom(newZoom);
  };

  const handleZoomIn = () => {
    const newZoom = applyZoom(zoom + 0.1);
    setZoom(newZoom);
  };

  const handleZoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (event.ctrlKey) return;
    event.preventDefault();

    const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = applyZoom(zoom * zoomFactor);

    const treeX = (mouseX - pan.x) / zoom;
    const treeY = (mouseY - pan.y) / zoom;

    const newPanX = mouseX - treeX * newZoom;
    const newPanY = mouseY - treeY * newZoom;

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.button !== 0) return;
    setIsPanning(true);
    setPanStart({ x: event.clientX - pan.x, y: event.clientY - pan.y });
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!isPanning || !panStart) return;
    const newX = event.clientX - panStart.x;
    const newY = event.clientY - panStart.y;
    setPan({ x: newX, y: newY });
  };

  const stopPanning = () => {
    setIsPanning(false);
    setPanStart(null);
  };

  // ---- 6b. Жести touch ----
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      setIsTouchPanning(true);
      setTouchPanStart({
        x: touch.clientX - pan.x,
        y: touch.clientY - pan.y,
      });
      setLastTouchDistance(null);
    } else if (event.touches.length === 2) {
      const touches = Array.from(event.touches);
      const t1 = touches[0];
      const t2 = touches[1];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const distance = Math.hypot(dx, dy);
      setLastTouchDistance(distance);
      setIsTouchPanning(false);
      setTouchPanStart(null);
    }
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (event.touches.length === 1 && isTouchPanning && touchPanStart) {
      const touch = event.touches[0];
      const newX = touch.clientX - touchPanStart.x;
      const newY = touch.clientY - touchPanStart.y;
      setPan({ x: newX, y: newY });
    } else if (event.touches.length === 2 && lastTouchDistance !== null) {
      event.preventDefault();

      const touches = Array.from(event.touches);
      const t1 = touches[0];
      const t2 = touches[1];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const distance = Math.hypot(dx, dy);
      if (distance === 0) return;

      const scaleChange = distance / lastTouchDistance;
      const newZoom = applyZoom(zoom * scaleChange);

      const pinchCenterX = (t1.clientX + t2.clientX) / 2;
      const pinchCenterY = (t1.clientY + t2.clientY) / 2;

      const treeX = (pinchCenterX - pan.x) / zoom;
      const treeY = (pinchCenterY - pan.y) / zoom;

      const newPanX = pinchCenterX - treeX * newZoom;
      const newPanY = pinchCenterY - treeY * newZoom;

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
      setLastTouchDistance(distance);
    }
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    setIsTouchPanning(false);
    setTouchPanStart(null);
    setLastTouchDistance(null);
  };

  const selectedNode = selectedId ? nodeById[selectedId] || null : null;

  // ---- 7. Початкове автоцентрування по p101 ----
  useEffect(() => {
    if (hasInitialCentered) return;
    if (!extendedNodes.length) return;

    const rootNode = extendedNodes.find((n) => n.id === "p101");
    if (!rootNode) return;

    const cardWidth = 240;
    const cardHeight = 80;

    const nodeCenterX = rootNode.x + cardWidth / 2;
    const nodeCenterY = rootNode.y + cardHeight / 2;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - 96;

    const targetX = viewportWidth / 2;
    const targetY = viewportHeight / 2;

    const newPanX = targetX - nodeCenterX;
    const newPanY = targetY - nodeCenterY;

    setPan({ x: newPanX, y: newPanY });
    setZoom(1);
    setHasInitialCentered(true);
  }, [extendedNodes, hasInitialCentered]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm text-emerald-300">
                {t("Графічне дерево (d3)", "Graph tree (d3)")}
              </span>
              <span className="text-[11px] text-slate-400">
                {t(
                  "автоматичне розташування гілок + подружжя поруч",
                  "automatic layout + spouses side by side"
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] bg-slate-800 rounded-full px-2 py-1">
              <button
                onClick={handleZoomOut}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900 text-slate-200 hover:bg-slate-700"
              >
                –
              </button>
              <button
                onClick={handleZoomReset}
                className="px-2 text-slate-200"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900 text-slate-200 hover:bg-slate-700"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <Link
                href="/tree"
                className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition cursor-pointer"
              >
                {t("Список поколінь", "Generation list")}
              </Link>
              <Link
                href="/"
                className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition cursor-pointer"
              >
                {t("На головну", "Home")}
              </Link>
            </div>

            <div className="flex items-center gap-1 text-[10px] bg-slate-800 rounded-full p-1">
              <button
                onClick={() => setLang("uk")}
                className={`px-2 py-0.5 rounded-full transition ${
                  lang === "uk"
                    ? "bg-emerald-400 text-slate-900 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                UA
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-full transition ${
                  lang === "en"
                    ? "bg-emerald-400 text-slate-900 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Полотно */}
      <section className="flex-1 px-0 pb-4 sm:px-4 sm:pb-6 pt-2">
        <div
          className="w-full h-[calc(100vh-96px)] border-t border-slate-800 bg-slate-900 overflow-hidden cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopPanning}
          onMouseLeave={stopPanning}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div
            style={{
              width: canvasWidth,
              height: canvasHeight,
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "top left",
              transition: isPanning ? "none" : "transform 0.15s ease-out",
            }}
          >
            <svg width={canvasWidth} height={canvasHeight} className="block">
              {/* Лінії батьки–діти */}
              <g stroke="#4ade80" strokeWidth={1} strokeOpacity={0.6}>
                {extendedNodes.map((childNode) => {
                  const child = childNode.person;
                  if (!child.parents || child.parents.length === 0) return null;

                  const parents = child.parents
                    .map((pid) => nodeById[pid])
                    .filter((p): p is Positioned => Boolean(p));

                  if (parents.length === 0) return null;

                  const childTopX = childNode.x + 120;
                  const childTopY = childNode.y;

                  if (parents.length === 1) {
                    const p = parents[0];
                    const parentCenterX = p.x + 120;
                    const parentBottomY = p.y + 80;

                    return (
                      <line
                        key={`edge-${p.id}-${child.id}`}
                        x1={parentCenterX}
                        y1={parentBottomY}
                        x2={childTopX}
                        y2={childTopY}
                      />
                    );
                  }

                  const [p1, p2] = parents;
                  const p1CenterX = p1.x + 120;
                  const p2CenterX = p2.x + 120;
                  const yParents = p1.y + 80;

                  const leftX = Math.min(p1CenterX, p2CenterX);
                  const rightX = Math.max(p1CenterX, p2CenterX);
                  const midX = (leftX + rightX) / 2;
                  const joinYBottom = yParents + 10;

                  return (
                    <g key={`edge-${p1.id}-${p2.id}-${child.id}`}>
                      <line x1={leftX} y1={yParents} x2={rightX} y2={yParents} />
                      <line
                        x1={midX}
                        y1={yParents}
                        x2={midX}
                        y2={joinYBottom}
                      />
                      <line
                        x1={midX}
                        y1={joinYBottom}
                        x2={childTopX}
                        y2={childTopY}
                      />
                    </g>
                  );
                })}
              </g>

              {/* Шлюбні лінії */}
              <g stroke="#22c55e" strokeWidth={1.2} strokeOpacity={0.7}>
                {marriageLines.map(({ a, b }, i) => {
                  const n1 = nodeById[a];
                  const n2 = nodeById[b];
                  if (!n1 || !n2) return null;

                  const aChildren = new Set(n1.person.children);
                  const hasSharedChild = n2.person.children.some((cid) =>
                    aChildren.has(cid)
                  );
                  if (hasSharedChild) return null;

                  const y = n1.y + 40;
                  const x1 = n1.x + 120;
                  const x2 = n2.x + 120;
                  return (
                    <line
                      key={`m-${i}`}
                      x1={Math.min(x1, x2)}
                      y1={y}
                      x2={Math.max(x1, x2)}
                      y2={y}
                    />
                  );
                })}
              </g>

              {/* Вузли */}
              {extendedNodes.map((n) => {
                const bgColor = n.person.branchColor || "#020617";

                return (
                  <foreignObject
                    key={n.id}
                    x={n.x}
                    y={n.y}
                    width={240}
                    height={80}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(n.id)}
                      style={{ backgroundColor: bgColor }}
                      className="w-[240px] h-[80px] border border-slate-700 rounded-xl px-3 py-2 text-[11px] shadow shadow-black/40 text-left hover:border-emerald-400 hover:brightness-110 transition"
                    >
                      <TreeNodeContent person={n.person} lang={lang} />
                    </button>
                  </foreignObject>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {selectedNode && (
        <PersonModal
          node={selectedNode.person}
          lang={lang}
          allById={byIdFull}
          onClose={() => setSelectedId(null)}
        />
      )}
    </main>
  );
}

function TreeNodeContent({ person, lang }: { person: Node; lang: Lang }) {
  const t = (uk: string, en: string) => (lang === "uk" ? uk : en);

  let lastNameUk = person.lastName || "";
  if (person.maidenName && person.maidenName.trim().length > 0) {
    lastNameUk = `${person.lastName} (${person.maidenName})`;
  }

  let lastNameEn = person.lastNameEn || person.lastName || "";
  if (person.maidenName && person.maidenName.trim().length > 0) {
    const maidenEn = person.maidenNameEn || person.maidenName;
    lastNameEn = `${person.lastNameEn || person.lastName} (${maidenEn})`;
  }

  const fullName =
    lang === "uk"
      ? `${person.firstName}${
          person.middleName ? " " + person.middleName : ""
        } ${lastNameUk}`
      : `${person.firstNameEn || person.firstName}${
          person.middleNameEn ? " " + person.middleNameEn : ""
        } ${lastNameEn}`;

  const years =
    person.birthDate || person.deathDate
      ? `${person.birthDate || "?"} – ${person.deathDate || ""}`
      : "";

  return (
    <div>
      <div className="font-semibold text-slate-50 truncate">{fullName}</div>
      <div className="text-[10px] text-slate-300 mb-0.5">ID: {person.id}</div>
      {years && (
        <div className="text-[10px] text-emerald-300 mb-0.5 truncate">
          {years}
        </div>
      )}
      <div className="text-[9px] text-slate-200">
        {t("Дітей:", "Children:")} {person.children.length}
      </div>
    </div>
  );
}

function PersonModal({
  node,
  lang,
  allById,
  onClose,
}: {
  node: Node;
  lang: Lang;
  allById: Record<string, Node>;
  onClose: () => void;
}) {
  const router = useRouter();
  const t = (uk: string, en: string) => (lang === "uk" ? uk : en);

  const fullNameUk = `${node.firstName}${
    node.middleName ? " " + node.middleName : ""
  } ${node.lastName}`.trim();

  const fullNameEn = `${node.firstNameEn || node.firstName}${
    node.middleNameEn ? " " + node.middleNameEn : ""
  } ${node.lastNameEn || node.lastName}`.trim();

  const fullName = lang === "uk" ? fullNameUk : fullNameEn;

  const years =
    node.birthDate || node.deathDate
      ? `${node.birthDate || "?"} – ${node.deathDate || ""}`
      : "";

  const parents =
    node.parents && node.parents.length
      ? node.parents.map((id) => allById[id]).filter(Boolean)
      : [];

  const children =
    node.children && node.children.length
      ? node.children.map((id) => allById[id]).filter(Boolean)
      : [];

  const spouses =
    node.spouses && node.spouses.length
      ? node.spouses.map((id) => allById[id]).filter(Boolean)
      : [];

  const formatName = (p: Node) =>
    lang === "uk"
      ? `${p.firstName}${p.middleName ? " " + p.middleName : ""} ${
          p.lastName
        }`
      : `${p.firstNameEn || p.firstName}${
          p.middleNameEn ? " " + p.middleNameEn : ""
        } ${p.lastNameEn || p.lastName}`;

  const handleOpenProfile = () => {
    router.push(`/profiles?id=${encodeURIComponent(node.id)}`);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const dialogTitleId = "person-modal-title";

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-md mx-2 sm:mx-4 rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl shadow-black/60 p-3 sm:p-4 text-[12px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-white text-xs"
          aria-label="Закрити модальне вікно / Close"
        >
          ✕
        </button>

        <div className="flex gap-3 mb-2">
          {node.photo ? (
            <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
              <img
                src={node.photo}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-16 h-16 rounded-xl border border-dashed border-slate-700 bg-slate-900 flex items-center justify-center text-[10px] text-slate-500">
              {t("немає фото", "no photo")}
            </div>
          )}

          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-300 mb-1">
              {t("Картка особи", "Person card")}
            </div>
            <h2
              id={dialogTitleId}
              className="text-sm font-semibold text-slate-50"
            >
              {fullName}
            </h2>
            <div className="text-[10px] text-slate-500">ID: {node.id}</div>
            {years && (
              <div className="text-[11px] text-emerald-300 mt-0.5">
                {years}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1 border-t border-slate-800 pt-2 mt-2">
          <div>
            <span className="font-semibold text-slate-200">
              {t("Батьки:", "Parents:")}{" "}
            </span>
            <span className="text-slate-300">
              {parents.length
                ? parents.map(formatName).join(", ")
                : t("немає даних", "no data")}
            </span>
          </div>
          <div>
            <span className="font-semibold text-slate-200">
              {t("Подружжя:", "Spouses:")}{" "}
            </span>
            <span className="text-slate-300">
              {spouses.length
                ? spouses.map(formatName).join(", ")
                : t("немає даних", "no data")}
            </span>
          </div>
          <div>
            <span className="font-semibold text-slate-200">
              {t("Діти:", "Children:")}{" "}
            </span>
            <span className="text-slate-300">
              {children.length
                ? children.map(formatName).join(", ")
                : t("немає даних", "no data")}
            </span>
          </div>
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleOpenProfile}
            className="px-3 py-1.5 rounded-full bg-emerald-400 text-slate-900 text-[11px] font-semibold hover:bg-emerald-300 transition"
          >
            {t("Повний профіль", "Full profile")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-200 text-[11px] hover:border-slate-400 transition"
          >
            {t("Закрити", "Close")}
          </button>
        </div>
      </div>
    </div>
  );
}
