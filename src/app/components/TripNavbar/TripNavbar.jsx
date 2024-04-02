import Image from "next/image";
import { ImStatsBars } from "react-icons/im";

export default function TripNavbar() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/next.png"
            width={40}
            height={40}
            alt="Profile Image"
            className="object-cover rounded-full"
          />

          <small>Hi, User!</small>
        </div>

        <nav className="flex items-center gap-2">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
