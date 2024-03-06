import GraphChart from "./GraphChart";
import OnchainChronicles from "./OnchainChronicles";
import Image from "next/image";
import footerLogoPic from "@/assets/common/foot_logo.svg";

interface GraphMobileRenderProps {
  highlightId?: string;
}

/**
 * @description This `GraphMobileRender` function renders a component for mobile
 * devices that displays a graph and an interactive element (a logo) that opens a new
 * browser tab when clicked. The function takes in `Props` object with the highlightId
 * as an argument, which is used to disable polling for the graph if it's not null/not
 * empty. It then returns JSX elements making up the main content area of the mobile
 * view, including the graph and the logo.
 * 
 * @param { GraphMobileRenderProps } props - In the GraphMobileRender function, the
 * `props` input parameter is used to pass information from the parent component to
 * the child component. Specifically, it provides two properties:
 * 
 * 1/ highlightId: a unique identifier for the graph component that indicates which
 * part of the chart should be highlighted.
 * 2/ toStoryprotocol: a function that opens a new browser tab with the StoryProtocol
 * website when clicked.
 * 
 * @returns { Component } The `GraphMobileRender` function returns a JSX component
 * that renders a graphical representation of data using a GraphChart library, and
 * also provides a button to open a story protocol page.
 * 
 * The component renders:
 * 
 * 	- A `main` element with a `flex` layout and `w-full` property set to `1`, ensuring
 * the content fits the entire available space.
 * 	- Inside the `main` element, there is a `div` element with a `flex` layout and
 * `max-w-screen-sm` property set to ensure the component doesn't exceed the screen
 * width on smaller devices. The `text-5xl` class is applied to make the text larger,
 * and the `font-medium` class is applied to make the font medium-sized.
 * 	- Inside the same `div` element, there is an instance of the `OnchainChronicles`
 * component, which renders a graphical representation of the data using the GraphChart
 * library.
 * 	- A second `div` element with a `className` set to `"grow"` or `"h-[90vw]
 * max-h-[600px]"` depending on whether the `highlightId` prop is present. This ensures
 * that the graph is responsive and fits the available space.
 * 	- A third `div` element with a `className` set to `"cursor-pointer"` and an
 * `onClick` event handler that opens the story protocol page by calling the
 * `toStoryprotocol()` function.
 * 
 * In summary, the `GraphMobileRender` function returns a JSX component that renders
 * a graphical representation of data using GraphChart, along with a button to open
 * a story protocol page.
 */
export default function GraphMobileRender(props: GraphMobileRenderProps) {
  const { highlightId } = props;
  /**
   * @description This function opens a new tab or window with the URL
   * "https://www.storyprotocol.xyz" using the `window.open()` method.
   */
  const toStoryprotocol = () => {
    window.open("https://www.storyprotocol.xyz", "_blank");
  };
  return (
    <>
      <main className="flex w-full flex-1 flex-col justify-center px-4 pb-4 pt-8">
        <div className="flex w-full max-w-screen-sm shrink text-5xl font-medium text-white">
          <OnchainChronicles />
        </div>
        <GraphChart
          className={`${highlightId ? "h-[90vw] max-h-[600px]" : "grow"}`}
          highlightId={highlightId}
          disablePolling={Boolean(highlightId)}
        />
      </main>
      <div className={"cursor-pointer py-4"} onClick={toStoryprotocol}>
        <Image className={"mx-auto"} src={footerLogoPic} alt={"logo"} />
      </div>
    </>
  );
}
