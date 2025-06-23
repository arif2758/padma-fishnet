"use client";

import { Card, Tag } from "antd";
import { IUser } from "@/models/usermodel";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const animationStyles = [
  "rise",
  "pan",
  "fade",
  "pop",
  "wipe",
  "blur",
  "succession",
  "breathe",
  "baseline",
  "drift",
  "tectonic",
  "tumble",
  "neon",
  "scrapbook",
  "stomp",
  "rotate",
  "flicker",
  "pulse",
  "wiggle",
];

const getAnimationForStyle = (style: string) => {
  switch (style) {
    case "rise":
      return { y: 50, opacity: 0, duration: 0.8, ease: "power2.out" };
    case "pan":
      return { x: -50, opacity: 0, duration: 0.8, ease: "power2.out" };
    case "fade":
      return { opacity: 0, duration: 1 };
    case "pop":
      return { scale: 0.5, opacity: 0, duration: 0.6, ease: "back.out(1.7)" };
    case "wipe":
      return { xPercent: 100, opacity: 0, duration: 0.8, ease: "power2.out" };
    case "blur":
      return { filter: "blur(10px)", opacity: 0, duration: 1 };
    case "succession":
      return { y: 30, opacity: 0, stagger: 0.2, duration: 0.8 };
    case "breathe":
      return { scale: 0.95, opacity: 0, duration: 1 };
    case "baseline":
      return { y: 20, scale: 0.8, opacity: 0, duration: 1 };
    case "drift":
      return { x: 100, opacity: 0, duration: 1 };
    case "tectonic":
      return { rotation: 5, x: -10, opacity: 0, duration: 0.8 };

    case "neon":
      return { opacity: 0, filter: "brightness(2)", duration: 0.8 };
    case "scrapbook":
      return { x: -20, y: -20, opacity: 0, duration: 0.9 };
    case "stomp":
      return {
        scale: 0.5,
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.5)",
      };
    case "rotate":
      return { rotation: 90, opacity: 0, duration: 0.8 };
    case "flicker":
      return { opacity: 0, duration: 0.5, repeat: 2, yoyo: true };
    case "pulse":
      return { scale: 1.2, opacity: 0, duration: 0.6 };
    case "wiggle":
      return { rotation: 10, x: 10, opacity: 0, duration: 0.8 };
    default:
      return { opacity: 0, y: 20, duration: 0.8 };
  }
};

interface UsersListProps {
  users: IUser[];
}

export default function UserList({ users }: UsersListProps) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      animationStyles.forEach((style) => {
        gsap.from(`.anim-style-${style}`, {
          scrollTrigger: {
            trigger: `.anim-style-${style}`,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          ...getAnimationForStyle(style),
        });
      });

      // Animate user name, mobile, address
      gsap.utils.toArray<HTMLElement>(".user-name").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          y: -20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".user-icon").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          x: -20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".user-mobile").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          x: 20,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });
      });
      gsap.utils.toArray<HTMLElement>(".user-mobile-icon").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          x: -20,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".user-address").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "sine.out",
        });
      });
      gsap.utils.toArray<HTMLElement>(".user-address-icon").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          y: -20,
          opacity: 0,
          duration: 1,
          ease: "sine.out",
        });
      });
    },

    
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="max-w-7xl mx-auto py-8 px-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          কর্মীদের তালিকা
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <p>মোট কর্মী: {users.length} জন</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user, index) => {
          const animClass = `anim-style-${
            animationStyles[index % animationStyles.length]
          }`;
          return (
            <Link key={user.userId} href={`/admin/${user.userId}`}>
              <div className={`card-wrapper ${animClass}`}>
                <Card
                  styles={{ header: { borderBottom: "none" } }}
                  size="small"
                  hoverable
                  title={
                    <Tag bordered={false} color="blue">
                      ID: {user.userId}
                    </Tag>
                  }
                  extra={
                    <span
                      className={`text-sm ${
                        user.userStatus === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {user.userStatus}
                    </span>
                  }
                >
                  <div>
                    <div className="flex gap-2 items-center mb-3">
                      <FaRegUser className="user-icon" />
                      <h1 className="text-lg font-medium text-gray-800 user-name">
                        {user.userName}
                      </h1>
                    </div>
                    <div className="flex gap-2 items-center mb-3">
                      <BsTelephone className="user-mobile-icon" />
                      <p className="text-gray-600 user-mobile">{user.mobile}</p>
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                      <CiLocationOn className="user-address-icon" />
                      <p className="user-address">{user.address}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
