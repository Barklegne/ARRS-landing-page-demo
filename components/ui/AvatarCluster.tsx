import Image from "next/image";
import { attendees } from "@/lib/content";

export function AvatarCluster() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
      <ul className="flex shrink-0 -space-x-2.5">
        {attendees.faces.map((person) => (
          <li key={person.id} className="relative shrink-0">
            <Image
              src={person.src}
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="avatar-ring size-10 shrink-0 rounded-full object-cover lg:size-9"
            />
          </li>
        ))}
      </ul>
      <p className="text-[15px] leading-snug text-on-dark">
        <span className="font-medium text-paper">{attendees.count}</span>{" "}
        {attendees.suffix}
      </p>
    </div>
  );
}
