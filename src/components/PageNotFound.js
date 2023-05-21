import useSound from 'use-sound';
import blinking from '../sounds/blink.mp3';
// import jim from '../images/giphy.gif';
// import jimRocket from '../images/jim_on_rocket.gif';


function PageNotFound() {
    const [play, {stop}] = useSound(blinking);
    return (
        <>
        <section className='not-found'>
            <div className="container">
            <div className='blink-lamp' 
            >
            <p className='not-found__code'
            onMouseEnter={() => play()} 
            onMouseLeave={() => stop()}
            >
                4<span className='not-found__code_blink'>0</span>4
            </p>
            </div>
            </div>
            <h2 className='not-found__title'>Упс...кажется страничка не нашлась)</h2>
            <p className='not-found__text'>К сожалению, запрашиваемая страница не найдена. Возможно, вы перешли по ссылке, в которой была допущена ошибка, или ресурс был удален. Попробуйте перейти на главную страницу</p>
            {/* <img src={jim} /> */}
            {/* <img src={jimRocket} /> */}
        </section>
        </>
    );
}

export default PageNotFound;