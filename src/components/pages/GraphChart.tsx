"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { init, EChartsType } from "echarts";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { mockData } from "@/public/data";
import { ChapterRelationship } from "@/interface/chapterRelationShipResponse";
import { generateChartData, generateChartOption } from "@/lib/chartUtils";

interface GraphChartProps {
  className?: string;
  highlightId?: string;
  isTv?: boolean;
  disablePolling?: boolean;
}

/**
 * @description generates and renders a line chart based on given data using ECharts
 * library. It handles state changes, effect hooks, and resizing.
 * 
 * @param { GraphChartProps } props - `GraphChartProps` type object, which provides
 * values for various properties of the `GraphChart` component, such as `className`,
 * `highlightId`, `isTv`, and `disablePolling`.
 * 
 * @returns { HTMLDivElement. } a React component that generates and displays a line
 * chart based on input data.
 * 
 * 		- `domRef`: A `HTMLDivElement` ref that holds the div element to which the graph
 * will be rendered.
 * 		- `chartRef`: A `EChartsType` ref that holds the chart instance created using
 * the `init()` method.
 * 		- `allData`: An array of `ChapterRelationship` objects, which contain the data
 * to be plotted on the chart.
 * 		- `lastId`: A `Ref<number>` that keeps track of the last id used in the chart
 * data, which is used for pagination purposes.
 * 		- `isLoading`: A `bool` that indicates whether the chart is being loaded or not.
 * 		- `highlightId`: An optional `string` that specifies the id of a chapter to be
 * highlighted on the chart.
 * 		- `isTv`: An optional `bool` that indicates whether the chart should be displayed
 * on a television or not.
 * 		- `disablePolling`: An optional `bool` that indicates whether the chart should
 * be polled for updates or not.
 * 
 * 	The `useEffect()` hooks are used to set up the chart and data, as well as to
 * handle window resizing. The `resize()` function is called automatically when the
 * window is resized, which keeps the chart updated.
 */
/**
 * @description updates the size of an underlying React component referred to by the
 * `chartRef.current`.
 */
export default function GraphChart(props: GraphChartProps) {
  const router = useRouter();
  const { className, highlightId, isTv, disablePolling } = props;
  const [allData, setAllData] = useState<ChapterRelationship[]>([]);
  const lastId = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const domRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType>();
  const isSmallDevice = useMediaQuery("(max-width : 768px)");
  const isMediumDevice = useMediaQuery("(min-width : 769px)");

  const getData = useCallback(() => {
    setAllData(mockData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  useEffect(() => {
    if (domRef && domRef.current) {
      chartRef.current = init(domRef.current);
    }
    return () => {
      chartRef.current?.dispose();
    };
  }, [domRef, highlightId, router]);

  useEffect(() => {
    if (chartRef.current && allData) {
      const chartData = generateChartData(allData);
      if (lastId.current < chartData.dataLastId) {
        lastId.current = chartData.dataLastId;
      }

      const option = generateChartOption({
        chartData,
        highlightId,
        isTv,
        isSmallDevice,
        isMediumDevice,
      });
      chartRef.current.setOption(option);
    }
  }, [allData, chartRef, highlightId, isMediumDevice, isSmallDevice, isTv]);

  function resize() {
    chartRef.current?.resize();
  }

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <div className={className} ref={domRef}></div>
    </>
  );
}
