

#!/bin/bash

BASE_PATH="../../../../Downloads/AET"

BF="$BASE_PATH/b_f/"

# Run the script with different arguments
./compressQuality.sh "$BF" ../public/cards/50 50
./compressQuality.sh "$BF" ../public/cards 90
