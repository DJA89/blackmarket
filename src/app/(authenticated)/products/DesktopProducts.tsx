import DesktopFilters from '~/components/DesktopFilters';
import AllProductsListSection from '~/components/AllProductsListSection';

export default function DesktopProducts() {
  return (
    <div className="hidden justify-center bg-background py-14 md:flex">
      <div className="flex">
        <DesktopFilters />
        <div className="flex flex-col">
          <div className="h-8 w-71"></div>
          <AllProductsListSection />
        </div>
      </div>
    </div>
  );
}
