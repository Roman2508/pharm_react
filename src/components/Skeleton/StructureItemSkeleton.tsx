import Skeleton from './Skeleton'

const StructureItemSkeleton = () => {
  return (
    <div className="page-row container">
      <div className="col-9-12">
        <Skeleton
          width="100%"
          height="400"
          radius="10"
          className={'cmk-main-photo'}
          styles={{ marginBottom: '40px' }}
        />
        <Skeleton width="100%" height="40" radius="10" className={'cmk-main-photo'} styles={{ marginBottom: '10px' }} />
        <Skeleton width="80%" height="40" radius="10" className={'cmk-main-photo'} styles={{ marginBottom: '10px' }} />
        <Skeleton width="90%" height="40" radius="10" className={'cmk-main-photo'} styles={{ marginBottom: '30px' }} />
        <Skeleton width="100%" height="40" radius="10" className={'cmk-main-photo'} styles={{ marginBottom: '10px' }} />
        <Skeleton width="80%" height="40" radius="10" className={'cmk-main-photo'} styles={{ marginBottom: '10px' }} />
        <Skeleton width="90%" height="40" radius="10" className={'cmk-main-photo'} styles={{ marginBottom: '10px' }} />
      </div>
      <div className="col-3-12">
        <Skeleton
          width="100%"
          height="400"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '15px' }}
        />
        <Skeleton
          width="100%"
          height="28"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '10px' }}
        />
        <Skeleton
          width="90%"
          height="28"
          radius="10"
          className={'section-title-center'}
          styles={{ margin: '0 0 10px 30px' }}
        />
        <Skeleton
          width="80%"
          height="18"
          radius="10"
          className={'section-title-center'}
          styles={{ margin: '0 0 10px 55px' }}
        />
      </div>
    </div>
  )
}

export default StructureItemSkeleton
