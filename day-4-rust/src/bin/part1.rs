use regex::Regex;

fn main() {
    let file: &str = include_str!("../../input.txt");

    let cards: Vec<&str> = file.trim().split("\n").collect::<Vec<&str>>();

    let mut sum = 0;

    let card_regex = Regex::new(
        "^(?<name>Card +\\d+: +)(?<winning_nums>(\\d+ *)+)( +\\| +)(?<my_nums>(\\d+\\s*)+)",
    )
    .unwrap();

    for card in cards {
        match card_regex.captures(card) {
            Some(caps) => {
                let winning_nums = caps["winning_nums"].split_whitespace();

                let my_nums = caps["my_nums"].split_whitespace();

                let shared_values: Vec<&str> = winning_nums
                    .filter(|&item| my_nums.clone().any(|x| x == item))
                    .collect();

                if shared_values.len() > 0 {
                    let base: i32 = 2;

                    sum += base.pow(shared_values.len() as u32 - 1);
                }
            }
            None => {}
        };
    }

    println!("Part 1: {}", sum);
}
