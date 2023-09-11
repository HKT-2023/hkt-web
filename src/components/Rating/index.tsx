import SVG from 'react-inlinesvg'
import FullStar from 'resources/icons/full-star.svg'
import HalfStar from 'resources/icons/half-star.svg'

interface IProps {
  rating: number
}

const Rating = ({ rating }: IProps) => {
  const renderRating = () => {
    switch (rating) {
      case 1:
        return <SVG src={FullStar} />
      case 1.5:
        return (
          <>
            <SVG src={FullStar} />
            <SVG src={HalfStar} />
          </>
        )
      case 2:
        return (
          <>
            <SVG src={FullStar} />
            <SVG src={FullStar} />
          </>
        )
      case 2.5:
        return (
          <>
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={HalfStar} />
          </>
        )
      case 3:
        return (
          <>
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
          </>
        )
      case 3.5:
        return (
          <>
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={HalfStar} />
          </>
        )
      case 4:
        return (
          <>
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
          </>
        )
      case 4.5:
        return (
          <>
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={HalfStar} />
          </>
        )
      case 5:
        return (
          <>
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
            <SVG src={FullStar} />
          </>
        )
      default:
        break
    }
  }

  return <>{renderRating()}</>
}

export default Rating
