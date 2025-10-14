# Remove all Termux data including home directory, configuration, and installed packages
rm -rf $HOME/* $HOME/.* $PREFIX
# Alternatively safer option to remove only installed packages and leave home intact:
# rm -rf $PREFIX
# Close Termux app and restart for clean state
exit
pkg update
pkg install git
cd ~
git clone https://github.com/lickensogal/tech-ai-sites.git
git add .
git commit -m "Your commit message"
git push origin maingit config --global user.email "ogallickens@gmail.com"
git config --global user.name "lickensogal"git config --global user.email
git config --global user.name
git config --global user.email "ogallickens@gmail.com"
git config --global user.name "lickensogal"
git push origin main
