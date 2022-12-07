import { useMemo } from "react";
import { OVERALL_CHART_CONFIGS, OVERALL_CHART_RANGES } from "@/constants";
import useDashboardOverallHook from "./useDashboardOverallHook";

export type ScoreDistributedProps = {
  scoreDistributedAbove89: number;
  scoreDistributedBelow50: number;
  scoreDistributedBetween50to69: number;
  scoreDistributedBetween70to89: number;
};

export type DashboardOverallPropsType = {
  timeSpent: number;
  scoreDistributed: ScoreDistributedProps;
};

const buildScoreDistributedProps = ({
  scoreDistributedBelow50,
  scoreDistributedBetween50to69,
  scoreDistributedBetween70to89,
  scoreDistributedAbove89,
}: ScoreDistributedProps) => {
  const scoreDistributedValues = {
    [OVERALL_CHART_RANGES.AT_RISK]: scoreDistributedBelow50,
    [OVERALL_CHART_RANGES.BELOW_ACCEPTABLE]: scoreDistributedBetween50to69,
    [OVERALL_CHART_RANGES.ACCEPTABLE]: scoreDistributedBetween70to89,
    [OVERALL_CHART_RANGES.RECOMMENDED]: scoreDistributedAbove89,
  };

  const rangeLevelBarChartData = Object.values(OVERALL_CHART_CONFIGS).map(
    ({ range, fillColorClassName }) => {
      return {
        name: range,
        value: scoreDistributedValues[range],
        fillColorClassName,
      };
    }
  );

  const rangeLevelBarChartConfig = {
    barSize: 65,
    xAxisKey: "name",
    yAxisKey: "value",
    margin: { top: 48, right: 0, bottom: 5, left: 0 },
  };

  return {
    data: rangeLevelBarChartData,
    config: rangeLevelBarChartConfig,
  };
};

const Card = ({ children }: any) => <div>{children}</div>;
const ScoreDistributed = (props: any) => <div>ScoreDistributed</div>;
const PatientInteractionTime = ({ timeSpent }: any) => (
  <div>PatientInteractionTime</div>
);

const DashboardOverall = ({
  timeSpent,
  scoreDistributed,
}: DashboardOverallPropsType) => {
  const scoreDistributedProps = useMemo(
    () => buildScoreDistributedProps(scoreDistributed),
    [scoreDistributed]
  );
  const {
    handleScoreDistributedCardClick,
    handlePatientInteractionTimeCardClick,
  } = useDashboardOverallHook();

  return (
    <div className="c-dashboard-overall">
      <div className="u-els-padding-2x u-els-padding-none@mobile u-max-width-1400 c-dashboard-overall__container">
        <div className="c-dashboard-overall__score-distributed">
          <Card
            header="How are my students’ SPI scores distributed?"
            footer="Sort students by scores distributed"
            onFooterClick={handleScoreDistributedCardClick}
          >
            <ScoreDistributed {...scoreDistributedProps} />
          </Card>
        </div>
        <div className="c-dashboard-overall__patient-interaction-time">
          <Card
            header="Patient Interaction Time"
            footer="Sort students by low patient interaction time"
            onFooterClick={handlePatientInteractionTimeCardClick}
          >
            <PatientInteractionTime timeSpent={timeSpent} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverall;
