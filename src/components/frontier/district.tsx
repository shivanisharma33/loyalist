import { projects } from "@/content/projects";
import { mapProjects } from "@/content/frontier";
import { SectionHeader } from "./chapter";
import { DistrictExplorer, type DistrictProject } from "./district-explorer";

const shortName = (name: string) => name.replace(" Mine Property", "").replace(" Project", "");

export function District() {
  const data: DistrictProject[] = projects.map((p, i) => {
    const m = mapProjects[p.slug];
    return {
      slug: p.slug,
      n: String(i + 1).padStart(2, "0"),
      name: p.name,
      short: shortName(p.name),
      x: m.x,
      y: m.y,
      bearing: m.bearing,
      distance: p.map.distance,
      ha: Number(p.area.replace(/[^\d]/g, "")),
      commodities: p.commodities,
      stage: p.stage,
      ownership: m.ownership,
      ownershipNote: m.ownershipNote,
      key: m.key,
      summary: p.summary,
      image: p.image,
      figure: p.figures[0],
    };
  });

  return (
    <section id="district" aria-labelledby="district-title" className="grain relative isolate overflow-hidden bg-ink-950 text-ivory">
      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)] py-24 sm:py-32">
        <SectionHeader
          id="district-title"
          tone="dark"
          label="Projects · Four properties"
          title={
            <>
              Four properties around <span className="serif-accent text-gold-bright">Timmins</span>
            </>
          }
          lede="Select a project on the map or below to see its key figures, or overlay the Company's own regional map."
        />
        <div className="mt-14">
          <DistrictExplorer projects={data} />
        </div>
      </div>
    </section>
  );
}
