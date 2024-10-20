
#!/bin/bash

# Define the base path
BASE_PATH="../../../../Downloads/Beta"

# Define the subdirectories
declare -a SUB_DIRS=("b_f/" "b_s/" "bt_f/" "dk_s/" "p_f/" "p_s/" "sk_f" "sk_s")

# Loop through each subdirectory and run the compression scripts
for SUB_DIR in "${SUB_DIRS[@]}"; do
  FULL_PATH="$BASE_PATH/$SUB_DIR"
  
  # Run the script with different arguments
  ./compressQuality.sh "$FULL_PATH" ../public/cards/50 50
  ./compressQuality.sh "$FULL_PATH" ../public/cards 90
done


# #!/bin/bash

# BASE_PATH="../../../../Downloads/AET"

# BF="$BASE_PATH/b_f/"
# BS="$BASE_PATH/b_s/"
# BTF="$BASE_PATH/bt_f/"
# BTS="$BASE_PATH/bt_s/"
# PS="$BASE_PATH/p_s/"
# SK="$BASE_PATH/sk_f/"

# # Run the script with different arguments
# ./compressQuality.sh "$BF" ../public/cards/50 50
# ./compressQuality.sh "$BF" ../public/cards 90
