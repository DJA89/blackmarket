import MobileFilters from '~/components/MobileFilters';
import AllProductsListSection from '~/components/AllProductsListSection';

export default function MobileProducts() {
  return (
    <div className="w-full bg-background">
      <div className="w-full px-4">
        <div className="flex flex-col justify-center md:hidden">
          <MobileFilters />
          <AllProductsListSection />
        </div>
      </div>
    </div>
  );
}
