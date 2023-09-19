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
      <div className="flex w-82 flex-col justify-between">
        <Subscribe />
        <div className="text-sm">
          By subscribing you agree to receive weekly emails with our latest news
          and updates
        </div>
      </div>
    </>
  );
}
