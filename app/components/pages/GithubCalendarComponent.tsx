import ContributionGraph from "./ContributionGraph";
import { Slide } from "@/app/animation/Slide";

export default function GithubCalendarComponent() {
  return (
    <section className="w-full">
      <Slide delay={0.16}>
        <ContributionGraph />
      </Slide>
    </section>
  );
}
