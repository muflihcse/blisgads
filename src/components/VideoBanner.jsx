function VideoBanner({ scrollTopro }) {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://images.dailyobjects.com/marche/assets/images/other-2/desktop_home_page_herobanner_stack_collection.jpg?tr=cm-pad_crop,v-3,w-1920"
        alt="Premium iPhone Cases"
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-10 md:px-24">
        <div className="text-start max-w-3xl text-white">

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg">
            PREMIUM iPHONE CASES
          </h1>

          <p className="text-lg md:text-xl tracking-wide mb-10 font-light drop-shadow-md opacity-90">
            Engineered for protection. Designed for elegance.
          </p>

          <button
            onClick={scrollTopro}
            className="border border-white px-10 py-3 text-sm tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
          >
            SHOP NOW
          </button>

        </div>
      </div>

    </section>
  )
}

export default VideoBanner
