

export class View{
    render(dto){
        const rootElement = document.getElementById('root');
rootElement.append('GAME WILL BE HERE   '+ dto.status)
    }
}