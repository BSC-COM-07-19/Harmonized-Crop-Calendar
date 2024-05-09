import React from "react";
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import HomeLink from "./HomeLink";

const navigation = [
  { name: 'Harmonised Crop Calendar', href: '#', current: false },
  { name: 'Home', href: '#', current: false },
  { name: 'About Us', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
  return (
    <Disclosure as="nav" className="bg-green-700 text-green-100">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Image */}
              <div className="flex flex-shrink-0 items-center px-1 hidden sm:block">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              {/* Harmonised Crop Calendar */}
              <div className="flex flex-shrink-0 items-center">
                <a
                  href={navigation[0].href}
                  className={classNames(
                    navigation[0].current ? 'bg-gray-900 text-white text-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-medium font-bold hidden sm:block'
                  )}
                  aria-current={navigation[0].current ? 'page' : undefined}
                >
                  {navigation[0].name}
                </a>
              </div>
              {/* Home and About Us */}
              <div className="flex justify-end flex-1 mr-20 px-4">
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-4">
                    <HomeLink href={navigation[1].href} />
                    <a
                      href={navigation[2].href}
                      className={classNames(
                        navigation[2].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={navigation[2].current ? 'page' : undefined}
                    >
                      {navigation[2].name}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
