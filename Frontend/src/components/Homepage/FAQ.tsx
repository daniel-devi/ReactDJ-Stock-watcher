const FAQ = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Can't find the answer you're looking for? Reach out to our{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                customer support
              </a>{" "}
              team.
            </p>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-10">
              <div>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  How do I add a new stock to my favorite list?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  To add a new stock, go to the Dashboard page and use the input
                  form at the top to enter the stock symbol. Click on the 'Add'
                  button to save the stock to your list.
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Can I customize the notifications for price changes?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Yes, you can set up custom alerts for price changes on the
                  Notifications page. Click on the 'Add Alert' button and
                  specify the stock symbol, alert type, and threshold value.
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  How do I share my portfolio with friends?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Navigate to the Portfolio Sharing page and use the search bar
                  to find friends by username or email. Click on the 'Share'
                  button next to their name to grant access to your portfolio.
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Can I delete my account?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Yes, you can delete your account on the Profile page. Scroll
                  down to the bottom and click on the 'Delete Account' button.
                  Please note that this action is irreversible.
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  How often are real-time updates on the Dashboard?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Real-time updates on the Dashboard occur every minute to
                  ensure you have the latest information on your favorite
                  stocks.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
