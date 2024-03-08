import Image from "next/image";
import arrowRightBlackIcon from "@/assets/common/arrow_right_black.svg";
import { Button } from "@/components/ui/button";
import ClearGraphPage from "@/components/pages/ClearGraphPage";
import ViewIPGraph from "@/components/pages/ViewIPGraph";

/**
 * @description creates a HTML page with a simple layout and design, displaying a
 * message about Onchain Chronicles, a collective storytelling project. It includes
 * interactive elements such as a button to visit Twitter.
 * 
 * @returns { HTML main element with nested elements containing various texts and
 * buttons. } a responsive webpage with a storytelling experience.
 * 
 * 		- `main`: The outermost element in the returned HTML structure, with class "flex
 * w-full max-w-screen-sm flex-1 flex-col justify-center p-4". This element contains
 * all other elements in the page.
 * 		- `<h1>`: An HTML heading element with class "mb-4 text-5xl font-medium", which
 * displays the text "Onchain Chronicles" and has a margin bottom of 4 pixels.
 * 		- `<p>`: An HTML paragraph element with class "mb-4 text-xl", which displays the
 * text "A collective storytelling journey."
 * 		- `<p>`: Another HTML paragraph element with class "mb-4 text-xl", which displays
 * the text "Thank you for everyone who participated and contributed to Onchain
 * Chronicles during ETH Denver 2024. Stay tuned to our socials for more information
 * on the commemorative Story Protocol NFT."
 * 		- `<Button>`: An HTML button element with class "w-1/2 shadow-2xl", which displays
 * the text "Visit Twitter" and has a margin bottom of 4 pixels.
 * 		- `ViewIPGraph>`: An SVG graph element with an id of "ViewIPGraph".
 * 		- `<ClearGraphPage>`: A empty HTML element used to clear any previous content
 * on the page before the next output is displayed.
 */
export default function Page() {
  return (
    <main className="flex w-full max-w-screen-sm flex-1 flex-col justify-center p-4">
      <h1 className="mb-4 text-5xl font-medium">Onchain Chronicles</h1>
      <p className="mb-4 text-xl">A collective storytelling journey.</p>
      <p className="mb-4 text-xl">
        Thank you for everyone who participated and contributed to Onchain
        Chronicles during ETH Denver 2024. Stay tuned to our socials for more
        information on the commemorative Story Protocol NFT.
      </p>
      <p className="text-xl">
        With Onchain Chronicles, you continue the story and shape how the story
        is told paragraph by paragraph.
      </p>
      <div className="mt-4 flex gap-4 py-4">
        <ViewIPGraph />
        <Button className="w-1/2 shadow-2xl" asChild>
          <a href="https://twitter.com/StoryProtocol" target="blank">
            <span>Visit Twitter</span>
            <Image src={arrowRightBlackIcon} alt="back" className="ml-2" />
          </a>
        </Button>
      </div>
      <ClearGraphPage />
    </main>
  );
}
