import { DistrictMap, type MapProject } from "@/components/sections/district-map";
import { contourPaths } from "@/components/ui/contours";
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
    <section aria-labelledby="district-title" className="on-light bg-paper py-24 sm:py-32">
      <div className="shell">
        <div className="mb-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIndex index="05" label="Geographic Focus" />
            <SplitHeading id="district-title" className="display-lg mt-6 text-ink-900" lines={["Focused on the", <span key="b" className="serif-accent text-gold-ink">Timmins Mining Camp</span>]} />
          </div>
          <p className="lede text-ink-800 lg:col-span-5 lg:col-start-8 lg:pt-16" data-reveal="">
            All four properties are located in the Timmins, Ontario mining district — from the Tully mining lease northeast of the city to the
            past-producing DeSantis mine just southwest of it.
          </p>
        </div>
        <div data-reveal="">
          <DistrictMap projects={mapProjects} contours={contourPaths(18, 21)} />
        </div>
      </div>
    </section>
  );
}
