import { useState } from 'react';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function Subscribe() {
  const [email, setEmail] = useState('');

  return (
    <div className="mt-7 sm:mx-16 md:mx-0 md:mt-0">
      <div className="mb-4 font-bold md:text-2xl">
        Subscribe to our weekly newletter!
      </div>
      <form>
        <Input
          name="Email"
          label="Email"
          placeholder="Type your email"
          value={email}
          handleChange={({ target: { value } }) => setEmail(value)}
          labelColour="white"
          extraClasses="w-82"
        />
        <Button
          text="Subscribe"
          extraClasses="w-82"
          borderColour="border-white"
        />
      </form>
    </div>
  );
}
