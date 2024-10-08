/* eslint-disable react/prop-types */
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import Link from "next/link";
// import {deleteUrl} from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { Button } from "../ui/button";
import Image from "next/image";

interface UrlStructure {
  id: string;
  title: string;
  qr: string;
  custom_url?: string;
  short_url: string;
  original_url: string;
  created_at: string;
}

const LinkCard = ({
  url,
  userId,
  deleteFn,
  isDeleting,
}: {
  url: UrlStructure;
  userId: string;
  deleteFn: (id: string) => void;
  isDeleting: Boolean;
}) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  // console.log(url)

  return (
    <Link href={`/analytics/${url?.id}`} className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <Image
        src={url?.qr}
        className="h-32 object-contain  self-start"
        alt="qr code"
        width={150}
        height={150}
      />
      <div className="flex flex-col flex-1">
        <Link href={`/link/${url?.id}`} className="text-3xl font-extrabold hover:underline cursor-pointer hover:bg-slate-400/15 rounded-md p-2">
          {url?.title}
        </Link>
        <Link href={`/link/${url?.id}`} className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer hover:bg-slate-400/15 rounded-md p-2">
          {url?.custom_url ? url?.custom_url : url.short_url}
        </Link>
        <Link href={`/link/${url?.id}`} className="flex items-center gap-1 hover:underline cursor-pointer text-wrap flex-wrap hover:bg-slate-400/15 rounded-md ">
          <LinkIcon className="p-1" />
          <span className="flex flex-wrap w-auto">{url?.original_url}</span>
        </Link>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(`https://trimrr.in/${url?.short_url}`)
          }
        >
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button
          variant="ghost"
          onClick={() => deleteFn(url.id)}
          //   disabled={isDeleting}
        >
          {isDeleting ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </Link>
  );
};

export default LinkCard;
