
const probabilities = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7]
]

let lastPlay = ''
let player1
let player2
let winner

const board = document.querySelector('#tic-tac-toe')
const blocks = document.querySelectorAll('.block')
const start = document.querySelector('#start')
const reset = document.querySelector('#reset')


reset.addEventListener('click', (event) =>
{
    blocks.forEach(token => 
    {
        token.textContent = ''
    })

    lastPlay = ''
    player1 = null
    player2 = null

})

board.addEventListener('mouseover', (event) => 
{
    if (event.target.textContent !== 'X' && event.target.textContent !== 'O')
    {
        event.target.style.opacity = .9
    }
})

board.addEventListener('mouseout', (event) =>
{
    event.target.style.opacity = 1
    event.target.style["border-radius"] = '0px'
})

start.addEventListener('click', () =>
{
    if (!(player1 && player2))
    {
        player1 = (() =>
        {
            const xo = ['X', 'O']
            const name = prompt('Player#1 name: ')
            const mark = xo[parseInt(Math.random() * 2)]
            const marks = []
            return { name, mark, marks }
        })()

        player2 = (() =>
        {
            const name = prompt('Player#2 name: ')
            const mark = player1.mark === 'X' ? 'O' : 'X'
            const marks = []
            return { name, mark, marks }
        })()
    }
})

const check = function (player)
{
    return probabilities.some(combination =>
        combination.every(block =>
            player.marks.includes(block)
        )
    );
};

board.addEventListener('click', (event) =>
{
    if (player1 && player2)
    {
        if (!winner)
        {


            if (!event.target.textContent)
            {
                if (!lastPlay)
                {
                    console.log(player1.mark)
                    lastPlay = player1.mark
                    event.target.textContent = player1.mark
                    player1.marks.push(parseInt(event.target.dataset.id))
                    console.log(lastPlay)
                } else
                {

                    if (lastPlay === player1.mark)
                    {
                        event.target.textContent = player2.mark
                        lastPlay = player2.mark
                        player2.marks.push(parseInt(event.target.dataset.id))


                    } else
                    {
                        event.target.textContent = player1.mark
                        lastPlay = player1.mark
                        player1.marks.push(parseInt(event.target.dataset.id))


                    }

                    setTimeout(() =>
                    {
                        if (check(player2))
                        {
                            alert(`${player2.name} is the winner!`)
                            winner = true
                        } else if (check(player1))
                        {
                            alert(`${player1.name} is the winner!`)
                            winner = true
                        }
                    }, 200);
                }
            }
        }
    }
})
