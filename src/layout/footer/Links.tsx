import Link from 'next/link';

export default function Links() {
  return (
    <div className="flex h-58 w-88 flex-col justify-between text-white md:w-171 md:flex-row">
      <div className="flex h-29 w-full flex-row justify-between md:w-88">
        <div className="flex h-29 flex-col justify-between md:h-39">
          <h3 className="font-bold">Restore Furniture</h3>
          <ul className="flex h-22 flex-col justify-between md:h-31">
            <li>
              <Link href="#">Entries</Link>
            </li>
            <li>
              <Link href="#">Rates</Link>
            </li>
            <li>
              <Link href="#">Categories</Link>
            </li>
            <li>
              <Link href="#">Sale</Link>
            </li>
          </ul>
        </div>
        <div className="flex h-23 w-39 flex-col justify-between md:h-32 md:w-auto">
          <h3 className="font-bold">Stay connected</h3>
          <ul className="flex h-16 flex-col justify-between md:h-24">
            <li>
              <Link href="#">Instagram</Link>
            </li>
            <li>
              <Link href="#">Tik Tok</Link>
            </li>
            <li>
              <Link href="#">Facebook</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex h-16 w-full flex-row justify-between md:w-62">
        <div className="flex h-23 flex-col justify-between md:h-32">
          <h3 className="font-bold">Black Market</h3>
          <ul className="flex h-24 flex-col justify-between">
            <li>
              <Link href="#">Our history</Link>
            </li>
            <li>
              <Link href="#">Staff</Link>
            </li>
            <li>
              <Link href="#">Work with us</Link>
            </li>
          </ul>
        </div>
        <div className="flex h-17 w-39 flex-col justify-between md:h-22 md:w-auto">
          <h3 className="font-bold">Support</h3>
          <ul className="flex h-14 flex-col justify-between">
            <li>
              <Link href="#">Chat</Link>
            </li>
            <li>
              <Link href="#">Address</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
