import GraphChart from "./GraphChart";
import OnchainChronicles from "./OnchainChronicles";
import ShareStory from "./ShareStory";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import arrowRightBlackPic from "@/assets/common/arrow_right_black.svg";
import shareIconPic from "@/assets/common/share_icon.svg";
import footerLogoPic from "@/assets/common/foot_logo.svg";
import { envConfig } from "@/lib/envConfig";

interface GraphDesktopRenderProps {
  highlightId?: string;
}

/**
 * @description This function creates a component for the graph desktop render, which
 * includes several elements:
 * 
 * 1/ A container for the chart and highlighted section.
 * 2/ A button to continue another story or go back to the chapter list.
 * 3/ A button to learn about Story Protocol.
 * 4/ An icon in the bottom right corner of the screen that opens theStoryProtocol link.
 * 
 * @param { GraphDesktopRenderProps } props - In the GraphDesktopRender function, the
 * `props` input parameter is used to pass a props object that contains various
 * properties and functions needed for rendering the graph component. The `props`
 * object provides the following information:
 * 
 * 1/ highlightId: A unique identifier (integer) of the highlighted node in the graph.
 * This property is passed from the parent component to determine which node should
 * be highlighted when the user hovers over it.
 * 2/ disablePolling: An optional Boolean value that indicates whether the graph chart
 * should disable polling for the specified highlightId. When enabled, the graph will
 * not automatically refresh when the user navigates away and returns, reducing
 * unnecessary network requests.
 * 
 * @returns {  } The `GraphDesktopRender` function returns a React component that
 * renders a layout with three sections:
 * 
 * 1/ A header section with a large title "Onchain Chronicles"
 * 2/ A graph chart component with highlighting capabilities and disable polling based
 * on the value of `highlightId`
 * 3/ A set of buttons, including a "Continue Another Story" button that displays an
 * arrow icon when `highlightId` is not null, and a "Learn About Story Protocol"
 * button that opens a new tab with the learn protocol link.
 * 
 * The output returned by this function is a React component tree containing these
 * three sections.
 */
export default function GraphDesktopRender(props: GraphDesktopRenderProps) {
  const { highlightId } = props;
  /**
   * @description This JavaScript function creates a new tab in the current web browser
   * by opening a URL (`window.open()`) with the parameter `"https://www.story
   * protocol.xyz"` in an anonymous window (`_blank`).
   */
  const toStoryprotocol = () => {
    window.open("https://www.storyprotocol.xyz", "_blank");
  };
  return (
    <main className="flex w-full flex-1 content-between pb-4">
      <div className="flex grow flex-col pl-4	pt-8">
        <div className="text-5xl font-medium text-white">
          <OnchainChronicles />
        </div>
        <GraphChart
          className={"grow pl-12"}
          highlightId={highlightId}
          disablePolling={Boolean(highlightId)}
        />
      </div>
      <div className="flex w-full min-w-[480px] max-w-screen-sm flex-1 flex-col pr-16	pt-56">
        <ShareStory />
        <Button asChild className="shadow-2xl">
          <Link href="/chapters">
            {highlightId ? (
              <>Continue Another Story</>
            ) : (
              <>
                Continue a Story{" "}
                <Image
                  className="ml-2.5"
                  src={arrowRightBlackPic}
                  alt={"Button Icon"}
                />
              </>
            )}
          </Link>
        </Button>
        <Button asChild className="mb-4 mt-4">
          <a
            className="flex"
            target="_blank"
            href={envConfig.LEARN_STORY_PROTOCOL_LINK || ""}
          >
            Learn About Story Protocol{" "}
            <Image className="ml-2.5" src={shareIconPic} alt={"Blank Icon"} />
          </a>
        </Button>
        <div className={"cursor-pointer"} onClick={toStoryprotocol}>
          <Image className={"mx-auto"} src={footerLogoPic} alt={"logo"} />
        </div>
      </div>
    </main>
  );
}
