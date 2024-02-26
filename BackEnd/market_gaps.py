import requests # selenium, function calling, gpt agent (baby)
from bs4 import BeautifulSoup
from openai import OpenAI

client = OpenAI(
    api_key="",
)

def search_market_gaps(keyword):
    # Define the search query URL
    #url = f"https://www.google.com/search?q={keyword}&tbm=shop"
    #url = "https://www.thejoyofbusiness.co.uk/what/where-are-the-gaps-in-the-market-now/"
    url = "https://solveo.co/industries-with-potential-market-gaps-2/"
    
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all product titles
        product_titles = soup.find_all("h3")
        print(product_titles)
        
        if product_titles:
            print("Potential market gaps identified:")
            for title in product_titles:
                print("- " + title.text)
        else:
            print("No potential market gaps found.")
    else:
        print(response.status_code)
        print("Failed to retrieve data from the web.")


def generate_business_ideas(topic):
    prompt = f"Imagine you have crawled the web and are an absolute business expert, ready to revolutionize entrepreneurship. What are some potential gaps in the market related to {topic}?"
    stream = client.chat.completions.create(
        model="gpt-3.5-turbo", 
        messages = [
            {"role": "user",
            "content": prompt}
        ],
        stream=True
    )
    for chunk in stream:
        print(chunk.choices[0].delta.content or "", end="")


if __name__ == "__main__":
    keyword = input("Enter a keyword to search for market gaps: ")
    #search_market_gaps(keyword)
    generate_business_ideas(keyword)
