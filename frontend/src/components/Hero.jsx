export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-x-8 gap-y-12 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <img
                className="relative mx-auto w-full"
                src="./hero-image.png"
                alt="Recipe sharing platform"
              />
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Share Your Culinary
              <span className="mt-1 block text-orange-500">Masterpieces</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-md lg:text-md xl:text-md">
              Effortlessly upload and showcase your favorite recipes on our
              modern, user-friendly platform designed for food enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
