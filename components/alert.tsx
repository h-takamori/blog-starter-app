import Container from './container'
import cn from 'classnames'
import { EXAMPLE_PATH } from '../lib/constants'
import Link from 'next/link'

type Props = {
  preview?: boolean
}

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn('border-b', {
        'bg-neutral-800 border-neutral-800 text-white': preview,
        'bg-neutral-50 border-neutral-200': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-teal-300 duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              このページは{' '}
              <a
                href={`https://github.com/h-takamori`}
                className="underline hover:text-blue-600 duration-200 transition-colors"
              >
                https://github.com/h-takamori
              </a>
              {' '}のポートフォリオです。Next.jsの開発元であるVercelから提供されている
              <a
                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                className="underline hover:text-blue-600 duration-200 transition-colors"
              >
                サンプルコード
              </a>
              に独自の改変を加えました。
              <Link
                as={`posts/update-history`}
                href="posts/update-history"
                className="underline hover:text-blue-600 duration-200 transition-colors"
              >
                更新履歴
              </Link>
              をご参照ください。
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Alert
