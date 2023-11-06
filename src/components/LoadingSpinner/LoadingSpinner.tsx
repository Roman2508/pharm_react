import styles from './LoadingSpinner.module.scss'

const LoadingSpinner = () => {
  return <div className={styles['spinner']}></div>

  // return (
  //   <>
  //     <div className={styles['letters']}>
  //       <div>Ж</div>
  //       <div style={{ animationDelay: '0.25s', left: '90px' }}>Б</div>
  //       <div style={{ animationDelay: '0.5s', left: '140px' }}>Ф</div>
  //       <div style={{ animationDelay: '0.75s', left: '200px' }}>Ф</div>
  //       <div style={{ animationDelay: '1s', left: '260px' }}>К</div>
  //     </div>

  //     <div style={{ position: 'relative', height: '100px' }}>
  //       <div className={styles['spinner']}></div>
  //     </div>
  //   </>
  // )
}

export default LoadingSpinner
