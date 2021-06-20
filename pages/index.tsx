import DotBackground from '../components/dot-bg';


export default function Home() {
  return (
    <>
      <div className='absolute center w-full h-full'>
        <div id='text-paper' className='container bg-primary center elevation-8'>
          <div className='white text-center'>
            <h2>
              Hier entsteht gerade mein Portfolio
            </h2>
            <h5>
              Den aktuellen Stand dazu können sie unter <br></br><a target='blank' href='https://ratsch0k.github.io'>https://ratsch0k.github.io</a> einsehen.
            </h5>
          </div>
        </div>
      </div>
      <DotBackground />
    </>
  );
};

