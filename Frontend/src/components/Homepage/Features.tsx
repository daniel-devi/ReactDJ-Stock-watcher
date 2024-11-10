// Features.tsx

const Features = () => {
  return (
    <div className="bg-indigo-600 py-10 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-200">
            Stay Connected
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Features to keep you informed and connected
          </p>
          <p className="mt-6 text-lg leading-8 text-indigo-200">
            Explore the key features of our stock watcher application that help
            you stay updated and connected with your investments.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                Real-Time Updates
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-indigo-200">
                <p className="flex-auto">
                  Stay informed with live stock data updates
                </p>
                <p className="mt-6">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                Portfolio Sharing
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-indigo-200">
                <p className="flex-auto">
                  Easily share your stock portfolio with friends
                </p>
                <p className="mt-6">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                Notifications
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-indigo-200">
                <p className="flex-auto">
                  Receive alerts for price changes and thresholds
                </p>
                <p className="mt-6">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
