// Function to get the icon URL for a Pokemon type
export function getTypeIcon(type: string): string {
    switch (type) {
        case 'grass':
            return 'https://archives.bulbagarden.net/media/upload/a/a5/GrassIC.png';
        case 'fire':
            return 'https://archives.bulbagarden.net/media/upload/9/9f/FireIC.png';
        case 'water':
            return 'https://archives.bulbagarden.net/media/upload/b/b0/WaterIC.png';
        case 'bug':
            return 'https://archives.bulbagarden.net/media/upload/b/bd/BugIC.png';
        case 'normal':
            return 'https://archives.bulbagarden.net/media/upload/0/0f/NormalIC.png';
        case 'poison':
            return 'https://archives.bulbagarden.net/media/upload/8/86/PoisonIC.png';
        case 'electric':
            return 'https://archives.bulbagarden.net/media/upload/e/ea/ElectricIC.png';
        case 'ground':
            return 'https://archives.bulbagarden.net/media/upload/8/87/GroundIC.png';
        case 'fairy':
            return 'https://archives.bulbagarden.net/media/upload/3/31/FairyIC.png';
        case 'fighting':
            return 'https://archives.bulbagarden.net/media/upload/9/9b/FightingIC.png';
        case 'psychic':
            return 'https://archives.bulbagarden.net/media/upload/f/f8/PsychicIC.png';
        case 'rock':
            return 'https://archives.bulbagarden.net/media/upload/e/e6/RockIC.png';
        case 'ghost':
            return 'https://archives.bulbagarden.net/media/upload/c/c3/GhostIC.png';
        case 'ice':
            return 'https://archives.bulbagarden.net/media/upload/8/86/IceIC.png';
        case 'dragon':
            return 'https://archives.bulbagarden.net/media/upload/c/c3/DragonIC.png';
        case 'dark':
            return 'https://archives.bulbagarden.net/media/upload/e/e3/DarkIC.png';
        case 'steel':
            return 'https://archives.bulbagarden.net/media/upload/7/7e/SteelIC.png';
        case 'flying':
            return 'https://archives.bulbagarden.net/media/upload/d/dc/FlyingIC.png';
        default:
            return 'url-to-default-icon'; // Return a default icon if the type is not recognized
    }
}
