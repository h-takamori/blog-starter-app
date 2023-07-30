import { CMS_NAME } from '../lib/constants'
import CoverImage from './cover-image'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

const Intro = () => {
  return (
    <section className="flex-col flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{' '}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          Next.js
        </a>{' '}
        and {CMS_NAME}.
      </h4>
      <div className="mb-8 md:mb-16">
        <Splide
          options={ {
            rewind: true,
            autoplay : true,
            interval : 3000,
          } }
        >
          <SplideSlide>
            <CoverImage title='image1' src='/assets/blog/dynamic-routing/cover.jpg' />
          </SplideSlide>
          <SplideSlide>
            <CoverImage title='image2' src='/assets/blog/hello-world/cover.jpg' />
          </SplideSlide>
          <SplideSlide>
            <CoverImage title='image3' src='/assets/blog/preview/cover.jpg' />
          </SplideSlide>
        </Splide>
      </div>
    </section>
  )
}

export default Intro
