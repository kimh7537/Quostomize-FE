import Link from "next/link"

const SquareButton = async ({href, message}) => {

  return (
    <Link href={href}>
      <div className="w-28 h-10 leading-10 color1 text-center align-middle rounded-md">
        {message}
      </div>
    </Link>
  )
}

export default SquareButton;