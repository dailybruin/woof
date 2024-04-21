import Article, { Articles } from '../models/article';
import { Props } from '../pages/index';


const Quicklink = ({ articles }: Props) => {
    // console.log(articles)
    return (
        <>
            <div 
            className='rounded-xl border-black border-t-4 border-l-4 border-b-8 border-r-8 w-96'
            >
                <div
                className='border-black border-b-4 bg-purple-400 h-20 w-full rounded-t-md items-center pl-8 flex'
                >
                    <p
                    className='font-black text-center text-4xl justify-center text-white'
                    >
                        Quick Links
                    </p>

                </div>
                <div
                className='py-6 px-10 '
                >
                    {articles.filter(a => a.quick_link).map(a => (
                        <p
                        className='text-blue py-1 text-lg font-bold'
                        >
                            <a href={a.image_url}>{a.title}</a>
                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Quicklink