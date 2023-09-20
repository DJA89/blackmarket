import Links from './Links';
import SocialMedia from './SocialMedia';
import Subscribe from './Subscribe';

export default function MobileFooter() {
  return (
    <>
      <div>
        <Links />
        <SocialMedia />
      </div>
      <div className="flex h-67 w-82 flex-col justify-between md:mt-19 lg:mt-0">
        <Subscribe />
        <div className="text-sm">
          By subscribing you agree to receive weekly emails with our latest news
          and updates
        </div>
      </div>
    </>
  );
}
