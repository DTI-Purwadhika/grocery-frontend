"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@nextui-org/button";
import { Apple } from "lucide-react";
import { FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Badge } from "@nextui-org/badge";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Blocks, Heart, ShoppingCart } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { SearchBar } from "@/components/elements";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/providers/CartProviders";
import { useProfile } from "@/hooks/useProfile";

export const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { logout } = useLogout();
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [openDropdownMenu, setOpenDropdownMenu] = useState<boolean>(false);
  const [openSmallDropdownMenu, setSmallOpenDropdownMenu] = useState<boolean>(false);
  const { userProfile } = useProfile();
  const { cartCount } = useCart();

  const toggleMenu = () => {
    setOpenHamburgerMenu(!openHamburgerMenu);
  };

  const handleDropdown = () => {
    setOpenDropdownMenu(!openDropdownMenu);
  };

  const handleSmallDropdown = () => {
    setSmallOpenDropdownMenu(!openSmallDropdownMenu);
  };

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setOpenDropdownMenu(false);
    }

    if (isDesktop) {
      setSmallOpenDropdownMenu(false);
    }

    if (isDesktop && openHamburgerMenu) {
      setOpenHamburgerMenu(false);
    }
  }, [isDesktop, openHamburgerMenu]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 text-white bg-white">
        <div className="relative">
          <div className="relative z-40 text-white bg-no-repeat bg-cover py-4">
            <div className="flex px-4 items-center justify-between lg:px-10">
              <div className="flex items-center gap-2">
                <button
                  className="flex flex-col justify-center items-center w-10 h-10 bg-white rounded focus:outline-none lg:hidden"
                  onClick={toggleMenu}
                >
                  <span
                    className={`block w-6 h-1 bg-green-500 rounded-sm transform transition-transform duration-300 ease-in-out ${openHamburgerMenu ? "rotate-45 translate-y-1" : ""}`}
                  ></span>
                  <span
                    className={`block w-6 h-1 bg-green-500 rounded-sm transform transition-transform duration-300 ease-in-out ${openHamburgerMenu ? "opacity-0" : "my-1"}`}
                  ></span>
                  <span
                    className={`block w-6 h-1 bg-green-500 rounded-sm transform transition-transform duration-300 ease-in-out ${openHamburgerMenu ? "-rotate-45 -translate-y-1" : ""}`}
                  ></span>
                </button>

                <span className="font-bold text-green-600 text-xl lg:text-2xl lg:ml-6 flex flex-row gap-1 lg:gap-2 items-center">
                  <Apple /> Grocery App
                </span>
              </div>

              <div>
                <ul className="gap-20 px-20 font-bold text-black hidden lg:flex">
                  <li>
                    <Link href="/catalog">Catalog</Link>
                  </li>
                </ul>
              </div>

              <div className="grow text-black mx-1 lg:mx-4 max-w-xl hidden lg:block">
                <SearchBar title="product" />
              </div>

              <div className="flex items-center gap-4 lg:gap-1 lg:space-x-4 space-x-1">
                {!openHamburgerMenu && session && userProfile?.role === "CUSTOMER" && (
                  <Link href="my-cart">
                    <Badge content={cartCount} color="danger">
                      <Button isIconOnly variant="bordered" color="warning">
                        <FaShoppingCart className="h-6 w-6" />
                      </Button>
                    </Badge>
                  </Link>
                )}
                {session ? (
                  <>
                    {userProfile?.role === "CUSTOMER" ? (
                      <>
                        <div className="hidden lg:block">
                          <Dropdown isOpen={openDropdownMenu} onOpenChange={handleDropdown}>
                            <DropdownTrigger>
                              <Button
                                className="hover:bg-gray-400"
                                variant="light"
                                // @ts-ignore
                                startContent={
                                  <Avatar isBordered size="sm" src={userProfile?.profilePicture} />
                                }
                                endContent={
                                  openDropdownMenu ? (
                                    <FaChevronUp height={40} width={40} className="text-black" />
                                  ) : (
                                    <FaChevronDown height={40} width={40} className="text-black" />
                                  )
                                }
                              >
                                <h3 className="font-bold text-sm text-black line-clamp-1">
                                  {userProfile?.name}
                                </h3>
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownItem
                                onPress={() => router.push("/my-profile")}
                                startContent={<FaUser />}
                              >
                                Your Profile
                              </DropdownItem>
                              <DropdownItem
                                startContent={<TbLogout className="w-[20px] h-[20px]" />}
                                className="text-red-500"
                                color="danger"
                                onPress={logout}
                              >
                                Logout
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <div className="lg:hidden">
                          <Dropdown
                            isOpen={openSmallDropdownMenu}
                            onOpenChange={handleSmallDropdown}
                          >
                            <DropdownTrigger>
                              <Button isIconOnly className="hover:bg-gray-400" variant="light">
                                <Avatar
                                  isBordered
                                  size="sm"
                                  // @ts-ignore
                                  src={userProfile?.profilePicture}
                                />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu disabledKeys={["name"]}>
                              <DropdownItem key="name">
                                <span className="text-medium text-black">{userProfile?.name}</span>
                              </DropdownItem>
                              <DropdownItem
                                onPress={() => router.push("/my-profile")}
                                key="profile"
                                startContent={<FaUser />}
                              >
                                Your Profile
                              </DropdownItem>
                              <DropdownItem
                                key="logout"
                                startContent={<TbLogout className="w-[20px] h-[20px]" />}
                                className="text-red-500"
                                color="danger"
                                onPress={logout}
                              >
                                Logout
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:block">
                          <Dropdown isOpen={openDropdownMenu} onOpenChange={handleDropdown}>
                            <DropdownTrigger>
                              <Button
                                className="hover:bg-gray-400"
                                variant="light"
                                // @ts-ignore
                                startContent={
                                  <Avatar isBordered size="sm" src={userProfile?.profilePicture} />
                                }
                                endContent={
                                  openDropdownMenu ? (
                                    <FaChevronUp height={40} width={40} className="text-black" />
                                  ) : (
                                    <FaChevronDown height={40} width={40} className="text-black" />
                                  )
                                }
                              >
                                <h3 className="font-bold text-sm text-black line-clamp-1">
                                  {userProfile?.name}
                                </h3>
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownItem
                                onPress={() => router.push("/dashboard")}
                                startContent={<MdDashboard />}
                              >
                                Dashboard
                              </DropdownItem>
                              <DropdownItem
                                startContent={<TbLogout className="w-[20px] h-[20px]" />}
                                className="text-red-500"
                                color="danger"
                                onPress={logout}
                              >
                                Logout
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <div className="lg:hidden">
                          <Dropdown
                            isOpen={openSmallDropdownMenu}
                            onOpenChange={handleSmallDropdown}
                          >
                            <DropdownTrigger>
                              <Button isIconOnly className="hover:bg-gray-400" variant="light">
                                <Avatar
                                  isBordered
                                  size="sm"
                                  // @ts-ignore
                                  src={userProfile?.profilePicture}
                                />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu disabledKeys={["name"]}>
                              <DropdownItem key="name">
                                <span className="text-medium text-black">{userProfile?.name}</span>
                              </DropdownItem>
                              <DropdownItem
                                onPress={() => router.push("/dashboard")}
                                key="profile"
                                startContent={<MdDashboard />}
                              >
                                Dashboard
                              </DropdownItem>
                              <DropdownItem
                                key="logout"
                                startContent={<TbLogout className="w-[20px] h-[20px]" />}
                                className="text-red-500"
                                color="danger"
                                onPress={logout}
                              >
                                Logout
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="hidden lg:block">
                    <Button
                      onPress={() => signIn()}
                      className="text-white font-bold"
                      color="success"
                      variant="solid"
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`absolute z-30 text-2xl text-green-600 font-bold w-screen left-[-100%] bg-white transition-transform duration-500 ease-in-out ${openHamburgerMenu ? "translate-x-full h-screen" : "-translate-x-full h-screen"}`}
          >
            {session ? (
              <>
                <Link href="/catalog">
                  <div className="flex justify-between items-center px-5 py-2 border-b-2 border-gray-100 hover:bg-green-600 hover:text-white">
                    <div className="flex gap-4 items-center">
                      <Blocks />
                      <h3>Catalog</h3>
                    </div>
                  </div>
                </Link>
                {userProfile?.role === "CUSTOMER" && (
                  <>
                    <Link href="/my-favorite">
                      <div className="flex justify-between items-center px-5 py-2 gap-4 border-b-2 border-gray-100 hover:bg-green-600 hover:text-white">
                        <div className="flex gap-4 items-center">
                          <Heart />
                          <h3>Favorite</h3>
                        </div>
                      </div>
                    </Link>
                    <Link href="/my-cart">
                      <div className="flex justify-between items-center px-5 py-2 border-b-2 border-gray-100 hover:bg-green-600 hover:text-white">
                        <div className="flex gap-4 items-center">
                          <ShoppingCart />
                          <h3>Cart</h3>
                        </div>
                      </div>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link href="/catalog">
                  <h1 className="text-green-600 border-b-2 border-gray-100 px-5 py-4 hover:text-white hover:bg-green-600">
                    Catalog
                  </h1>
                </Link>
                <Link href="/login">
                  <h1 className="text-green-600 border-b-2 border-gray-100 px-5 py-4 hover:text-white hover:bg-green-600">
                    Login
                  </h1>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
