import Link from "next/link";

import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineWhatsApp,
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";

export function Social({ userData }) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 lg:gap-4">
      {userData?.website_url && (
        <Link href={userData?.website_url} target="_blank" rel="noopener noreferrer">
          <TfiWorld className="text-2xl text-gray-900" />
        </Link>
      )}
      {userData?.facebook_url && (
        <Link href={userData?.facebook_url} target="_blank" rel="noopener noreferrer">
          <AiFillFacebook className="text-3xl text-gray-900" />
        </Link>
      )}
      {userData?.instagram_url && (
        <Link href={userData?.instagram_url} target="_blank" rel="noopener noreferrer">
          <AiFillInstagram className="text-3xl text-gray-900" />
        </Link>
      )}
      {userData?.whatsapp_url && (
        <Link href={userData?.whatsapp_url} target="_blank" rel="noopener noreferrer">
          <AiOutlineWhatsApp className="text-3xl text-gray-900" />
        </Link>
      )}
      {userData?.telegram_url && (
        <Link href={userData?.telegram_url} target="_blank" rel="noopener noreferrer">
          <FaTelegram className="text-[1.69rem] text-gray-900" />
        </Link>
      )}
      {userData?.twitter_url && (
        <Link href={userData?.twitter_url} target="_blank" rel="noopener noreferrer">
          <AiFillTwitterCircle className="text-3xl text-gray-900" />
        </Link>
      )}
      {userData?.github_url && (
        <Link href={userData?.github_url} target="_blank" rel="noopener noreferrer">
          <AiFillGithub className="text-3xl text-gray-900" />
        </Link>
      )}
      {userData?.linkedin_url && (
        <Link href={userData?.linkedin_url} target="_blank" rel="noopener noreferrer">
          <AiFillLinkedin className="text-3xl text-gray-900" />
        </Link>
      )}
    </div>
  );
}
