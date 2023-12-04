use regex::Regex;

fn main() {
    let file: &str = include_str!("../../input.txt");

    let cards: Vec<&str> = file.trim().split("\n").collect::<Vec<&str>>();

    let card_regex = Regex::new(
        "^(?<name>Card +\\d+: +)(?<winning_nums>(\\d+ *)+)( +\\| +)(?<my_nums>(\\d+\\s*)+)",
    )
    .unwrap();

    let mut my_cards = vec![1; cards.len()];

    let mut index = 0;
    for card in cards {
        match card_regex.captures(card) {
            Some(caps) => {
                let winning_nums = caps["winning_nums"].split_whitespace();

                let my_nums = caps["my_nums"].split_whitespace();

                let shared_values: Vec<&str> = winning_nums
                    .filter(|&item| my_nums.clone().any(|x| x == item))
                    .collect();

                let mut shared_index = 1;
                for _ in &shared_values {
                    my_cards[index + shared_index] += my_cards[index];

                    shared_index += 1;
                }
            }
            None => {}
        };

        index += 1;
    }

    let mut sum = 0;

    for val in my_cards {
        sum += val;
    }

    println!("Part 2: {}", sum);
}
