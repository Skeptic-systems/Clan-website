document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'https://api.wcked.de/api/clan/members';
    const clanMembersTableBody = document.getElementById('clanMembers').querySelector('tbody');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const loadLessButton = document.getElementById('loadLessButton');

    let members = [];
    let displayedMembersCount = 0;
    const maxInitialMembers = 15;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        members = await response.json();

        if (Array.isArray(members)) {
            members.sort((a, b) => b.trophies - a.trophies);

            displayMembers(0, maxInitialMembers);

            loadMoreButton.addEventListener('click', () => {
                if (displayedMembersCount < members.length) {
                    displayMembers(displayedMembersCount, 15);
                }
                if (displayedMembersCount >= members.length) {
                    loadMoreButton.style.display = 'none';
                }
                loadLessButton.style.display = 'inline-block';
            });

            loadLessButton.addEventListener('click', () => {
                collapseMembers();
                loadMoreButton.style.display = 'inline-block';
                loadLessButton.style.display = 'none';
            });

            if (members.length > maxInitialMembers) {
                loadMoreButton.style.display = 'inline-block';
            }
        } else {
            throw new Error('Die Antwort ist nicht im erwarteten Format.');
        }
    } catch (error) {
        console.error('Error fetching clan members:', error);
        const errorMessage = document.createElement('tr');
        const errorCell = document.createElement('td');
        errorCell.colSpan = 2;
        errorCell.textContent = `Es gab einen Fehler: ${error.message}`;
        errorMessage.appendChild(errorCell);
        clanMembersTableBody.appendChild(errorMessage);
    }

    function displayMembers(startIndex, count) {
        const endIndex = Math.min(startIndex + count, members.length);
        for (let i = startIndex; i < endIndex; i++) {
            const member = members[i];
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.className = 'table-spacer';
            const trophiesCell = document.createElement('td');
            trophiesCell.className = 'trophy-text';

            nameCell.textContent = member.name;
            trophiesCell.textContent = member.trophies;

            row.appendChild(nameCell);
            row.appendChild(trophiesCell);
            clanMembersTableBody.appendChild(row);
        }
        displayedMembersCount += (endIndex - startIndex);
    }

    function collapseMembers() {
        const rows = clanMembersTableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (index >= maxInitialMembers) {
                clanMembersTableBody.removeChild(row);
            }
        });
        displayedMembersCount = maxInitialMembers;
    }
});
