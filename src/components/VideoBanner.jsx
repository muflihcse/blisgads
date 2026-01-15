function VideoBanner({ scrollTopro }) {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="./assets/image.jpeg"
      />

     
      <div className="absolute inset-0 bg-gradient-to-b "></div>

      
      <div className="relative z-10 flex h-full items-center px-6">
        <div className="text-start w-1/2 text-black">

          <h1 className="text-4xl md:text-4xl font-semibold tracking-widest ">
            PREMIUM iPHONE CASES
          </h1>

          <p className="mt-5 text-sm md:text-base tracking-wide ml-[4rem]">
            Engineered for protection. Designed for elegance.
          </p>

          <div className="flex justify-center w-1/2">
  <button
    onClick={scrollTopro}
    className="mt-10 border  px-10 py-3 text-xs tracking-[0.3em] transition-all duration-300"
  >
    SHOP NOW
  </button>
</div>


        </div>
      </div>

    </section>
  )
}

export default VideoBanner
