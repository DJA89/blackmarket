import Image from 'next/image';
import Logo from '~/../public/authenticated/logo.svg';
import instagram from '~/../public/authenticated/instagram.svg';
import facebook from '~/../public/authenticated/facebook.svg';
import twitter from '~/../public/authenticated/twitter.svg';
import linkedin from '~/../public/authenticated/linkedin.svg';

export default function SocialMedia() {
  return (
    <div className="my-9 flex h-9 w-88 items-center justify-between sm:w-121 md:my-0 md:w-171">
      <Image src={Logo} alt="Black Market" className="w-26 md:w-48" />
      <div className="w-39 md:w-auto">
        <div className="flex w-24 items-center justify-between md:w-32">
          <Image
            src={instagram}
            alt="Instagram link"
            className="h-3 w-3 shrink-0 md:h-5 md:w-3"
          />
          <Image
            src={facebook}
            alt="Facebook link"
            className="h-3 w-3 shrink-0 md:h-5 md:w-3"
          />
          <Image
            src={twitter}
            alt="Twitter link"
            className="h-3 w-3 shrink-0 md:h-5 md:w-3"
          />
          <Image
            src={linkedin}
            alt="Linkedin link"
            className="h-3 w-3 shrink-0 md:h-5 md:w-3"
          />
        </div>
      </div>
    </div>
  );
}
