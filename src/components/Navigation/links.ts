export interface ILink {
   to: string, text: string, newWin?: boolean
}

export const links: ILink[] = [
   { text: 'Projects', to: '/' },
   { text: 'About me', to: '/about' },
   { text: 'Contacts', to: '/contacts' },
   { text: 'Linkedin', to: 'https://www.linkedin.com/in/dzemych/', newWin: true },
   { text: 'Github', to: 'https://github.com/dzemych', newWin: true },
   { text: 'Telegram', to: 'https://t.me/dzemych', newWin: true },
]