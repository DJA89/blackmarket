import Link from 'next/link';

export default function Links() {
  const restoreFurnitureLinks = [
    { link: '#', displayName: 'Entries' },
    { link: '#', displayName: 'Rates' },
    { link: '#', displayName: 'Categories' },
    { link: '#', displayName: 'Sale' },
  ];

  const stayConnectedLinks = [
    { link: '#', displayName: 'Instagram' },
    { link: '#', displayName: 'Tik Tok' },
    { link: '#', displayName: 'Facebook' },
  ];

  const blackMarketLinks = [
    { link: '#', displayName: 'Our history' },
    { link: '#', displayName: 'Staff' },
    { link: '#', displayName: 'Work with us' },
  ];

  const supportLinks = [
    { link: '#', displayName: 'Chat' },
    { link: '#', displayName: 'Address' },
  ];

  return (
    <div className="flex h-58 w-88 flex-col justify-between sm:w-121 md:w-171 md:flex-row">
      <div className="flex h-29 w-full flex-row justify-between md:w-88">
        <div className="flex h-29 flex-col justify-between md:h-39">
          <h3 className="font-bold">Restore Furniture</h3>
          <ul className="flex h-22 flex-col justify-between md:h-31">
            {restoreFurnitureLinks.map((link) => (
              <li key={link.displayName}>
                <Link href={link.link}>{link.displayName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-23 w-39 flex-col justify-between md:h-32 md:w-auto">
          <h3 className="font-bold">Stay connected</h3>
          <ul className="flex h-16 flex-col justify-between md:h-24">
            {stayConnectedLinks.map((link) => (
              <li key={link.displayName}>
                <Link href={link.link}>{link.displayName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex h-23 w-full flex-row justify-between md:h-16 md:w-62">
        <div className="flex h-23 flex-col justify-between md:h-32">
          <h3 className="font-bold">Black Market</h3>
          <ul className="flex h-24 flex-col justify-between">
            {blackMarketLinks.map((link) => (
              <li key={link.displayName}>
                <Link href={link.link}>{link.displayName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-17 w-39 flex-col justify-between md:h-22 md:w-auto">
          <h3 className="font-bold">Support</h3>
          <ul className="flex h-14 flex-col justify-between">
            {supportLinks.map((link) => (
              <li key={link.displayName}>
                <Link href={link.link}>{link.displayName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
