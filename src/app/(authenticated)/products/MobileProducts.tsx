import MobileFilters from '~/components/MobileFilters';
import AllProductsListSection from '~/components/AllProductsListSection';

export default function MobileProducts() {
  return (
    <div className="w-full bg-background">
      <div className="px-4 w-full">
        <div className="flex flex-col justify-center md:hidden">
          <MobileFilters />
          <AllProductsListSection />
        </div>
      </div>
    </div>
  );
}
