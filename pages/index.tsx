import DotBackground from '../components/dot-bg';
import Button from '../components/Button';
import Logo from '../components/icons/Logo';
import {useState} from 'react';
import Imprint from './imprint';
import Licenses from './licenses';
import Image from 'next/image';

interface LinkItem {
  name: string;
  url: string;
  icon?: JSX.Element;
}

const links: LinkItem[] = [
  {
    name: 'Portfolio (WIP)',
    url: 'https://ratsch0k.github.io'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Ratsch0k',
    icon: <Image alt='GitHub Logo' width={24} height={24} src='/GitHub-64px.png' />
  }
]

export default function Home() {
  const [openImprint, setOpenImprint] = useState<boolean>(false);
  const [openLic, setOpenLic] = useState<boolean>(false);

  return (
    <>
      <div className='absolute center w-full h-full'>
        <div id='text-paper' className='bg-primary center elevation-8 p-16 container'>
          <div className='text-primary text-center'>
            <Logo style={{height: 64}} strokeWidth={42} />
            <h3 className='mb-32 mt-0 bold'>
              Simon Kurz
            </h3>
            <h4>
              Hi,<br/>ich studiere IT-Sicherheit an der TU Darmstadt im Master und interessiere mich hauptsächlich für Software Entwicklung und Cybersecurity.
              <br />
              Von Webseiten, über Apps und SysAdmin bis hin zu einer kleinen Game Engine habe ich in vielen Themen Erfahrung.
              <br /><br />
              Unten könnt ihr alle meine Links sehen.
            </h4>

            {
              links.map(({name, url, icon}) =>
                <Button key={`link-to-${name}`} className='w-full mt-16' onClick={() => window.open(url, '_blank')}>
                  <div className='flex justify-center items-center'>
                    <span className='icon mr-4' style={{color: 'inherit'}}>
                      {icon}
                    </span>
                    {name}
                  </div>
                </Button>
              )
            }
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 right-0 flex bg-white p-4' style={{flexDirection: 'row'}}>
        <div className='primary text-button mt-8' onClick={() => setOpenImprint(true)}>
          Impressum
        </div>
        <div className='primary text-button' onClick={() => setOpenLic(true)}>
          Lizensen
        </div>
      </div>
      <Imprint close={() => setOpenImprint(false)} open={openImprint}/>
      <Licenses close={() => setOpenLic(false)} open={openLic}/>

      <DotBackground />
    </>
  );
};

