import { DistrictMap, type MapProject } from "@/components/sections/district-map";
import { SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { projects } from "@/content/projects";

export function District() {
  const mapProjects: MapProject[] = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    x: p.map.x,
    y: p.map.y,
    distance: p.map.distance,
    area: p.area,
    commodities: p.commodities,
    ownership: p.ownership,
    stage: p.stage,
  }));
  return (
    <section aria-labelledby="district-title" className="on-light section bg-paper">
      <div className="shell">
        <DistrictMap
          projects={mapProjects}
          header={
            <>
              <SectionIndex index="05" label="Geographic Focus" />
              <SplitHeading
                id="district-title"
                className="display-md mt-s3 text-ink-900"
                lines={["Focused on the", <span key="b" className="serif-accent text-gold-ink">Timmins Mining Camp</span>]}
              />
              <p className="measure-sm mt-s3 text-[0.9375rem] leading-relaxed text-ink-800">
                All four properties sit in the Timmins, Ontario mining district — from the Tully mining lease northeast of the city to the
                past-producing DeSantis mine just southwest of it.
              </p>
            </>
          }
        />
      </div>
    </section>
  );
}
