import Mail from "./mail.svg";
import Github from "./github.svg";
import Facebook from "./facebook.svg";
import Youtube from "./youtube.svg";
import Linkedin from "./linkedin.svg";
import Twitter from "./twitter.svg";

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

const SocialIcon = ({ kind, href, size = 8 }) => {
  const SocialSvg = components[kind];
  return (
    <div>
      <a
        className="text-sm text-gray-500 transition hover:text-gray-600"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
      >
        <span className="sr-only">{kind}</span>
        <h4>hello</h4>
        {/* <SocialSvg
          className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-${size} w-${size}`}
        /> */}
      </a>
    </div>
  );
};

export default SocialIcon;
